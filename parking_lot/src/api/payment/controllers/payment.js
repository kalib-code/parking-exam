'use strict';

/**
 *  payment controller
 */


const { createCoreController } = require('@strapi/strapi').factories;
const timediff = require('timediff');
const _ = require('lodash');

module.exports = createCoreController('api::payment.payment' , {

    async create(ctx) {
        const dateNow = new Date();

        const { ticket , time_out } = ctx.request.body.data

        //get ticket entity
        const getTicket = await strapi.entityService.findOne(
            "api::ticket.ticket",
           ticket
          );
          const { time_in , vehicle_type , vehicle_no } = getTicket

             //get ticket entity with payment for time_out
          const getPaymentList = await strapi.entityService.findMany(
            "api::payment.payment",{
            populate: {
                ticket: true,
                  filters:  {
                    $and:[
                        {
                            vehicle_no: `${vehicle_no}`
                        },
                        {
                            time_in:{$gte:time_in}
                        }
                    ]
                }  
              },
            }
          );

            //verified if the vehicle came back less than 1 hour
           const getVerifiedTicket = getPaymentList.map(ticket => {
           const timeA =  timediff( ticket.time_out,dateNow, 'H');

           if( timeA.hours <= 1){
            return _.round(timeA.hours)
           }else{
               return 0
           }
           }).reduce((a, b) => a + b, 0);

        
           //LOGIC CHARGE TIME
         const timeCharge =  timediff(time_in, time_out, 'H');
            const timeRouded = _.round(timeCharge.hours)
            let totalHours = 0;

            

            if(timeRouded <= 3){
                totalHours = 40
            }

            if(timeRouded > 3 && getVerifiedTicket === 0){

                switch(vehicle_type){
                    case "S":
                        totalHours = 40 + getVerifiedTicket + (timeRouded - 3) * 20
                        break;
                    case "M":
                        totalHours = 40 +getVerifiedTicket +  (timeRouded - 3) * 60
                        break;
                    case "L":
                        totalHours = 40 +getVerifiedTicket+ (timeRouded - 3) * 100
                        break;
                }
                
            }

            if( getVerifiedTicket > 0){

                switch(vehicle_type){
                    case "S":
                        totalHours = timeRouded * 20
                        break;
                    case "M":
                        totalHours = timeRouded * 60
                        break;
                    case "L":
                        totalHours = timeRouded * 100
                        break;
                }
                
            }

            if(timeRouded> 24){
                totalHours = 5000
            }

            ctx.request.body.data = {
                ...ctx.request.body.data,
                total_hours: timeRouded,
                total_amount: totalHours,
                Paid: true
            }

        const response = await super.create(ctx);
      
        return response;
      }
       

    
});
