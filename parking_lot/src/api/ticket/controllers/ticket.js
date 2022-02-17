"use strict";

/**
 *  ticket controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::ticket.ticket", {
  //calculated the nearest parking lot

  async create(ctx) {

  const data = ctx.request.body;

  console.log(data)

  let gateNo
  switch (data.data.gate) {
      case "A":
           gateNo = 1;
           break;
      case "B":
           gateNo = 2;
           break;
      case "C":
           gateNo = 3;
           break;

  }
    const parkingSpaceEntity = await strapi.entityService.findMany(
      "api::parking-space.parking-space",
      { filters: { types: `${data.data.vehicle_type}P`, gate: data.data.gate } }
    );


  let arrayPark = []
    for(let i=0;i<parkingSpaceEntity.length;i++){
        console.log(parkingSpaceEntity[i].gate)
        arrayPark.push(gateNo)
        arrayPark.push(parkingSpaceEntity[i].number)
        }

   const datas =  arrayPark.reduce(function(result, value, index, array) {
        if (index % 2 === 0)
          result.push(array.slice(index, index + 2));
        return result;
      }, []);

     const resultPark =  await strapi.service('api::ticket.ticket').kPoints(datas, [gateNo, 0]);

     let GateSelected = ''

     switch (resultPark[0]) {
           case 1:
                   GateSelected = 'A'
                   break;
           case 2:
                   GateSelected = 'B'
                   break;
           case 3:
                   GateSelected = 'C'
                   break;
     }


      const parkingSelectedEntity = await strapi.entityService.findMany(
        "api::parking-space.parking-space",
        { filters: { gate: GateSelected , number: resultPark[1] } }
      );

    ctx.request.body.data.parking_space = parkingSelectedEntity[0].id;
    ctx.request.body.data.allocated_space = `${parkingSelectedEntity[0].types} GATE ${parkingSelectedEntity[0].gate} Parking Lot Number ${parkingSelectedEntity[0].number}`;

    const response = await super.create(ctx);
    return response;
  },
});
