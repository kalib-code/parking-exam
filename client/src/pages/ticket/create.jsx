
import {
    useForm,
    Create,
    Form,
    Input,
    Select,
    TimePicker
} from "@pankod/refine-antd";


export const TicketCreate = () => {
    const { formProps, saveButtonProps } = useForm();
    // time_in": "2022-02-17T06:50:00.000Z",
    // "gate": "A",
    // "vehicle_type": "S",
    // "vehicle_no": "12312311231"


    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
                <Form.Item label="Time in" name="time_in">
                <TimePicker />
                </Form.Item>
                <Form.Item label="Gate" name="gate">
                    <Select
                        options={[
                            {
                                label: "A",
                                value: "A",
                            },
                            {
                                label: "B",
                                value: "B",
                            },
                            {
                                label: "C",
                                value: "C",
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Vehicle Type" name="vehicle_type">
                    <Select
                        options={[
                            {
                                label: "Small",
                                value: "S",
                            },
                            {
                                label: "Medium",
                                value: "M",
                            },
                            {
                                label: "Large",
                                value: "L",
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Vehicle No" name="vehicle_no">
                    <Input />
                </Form.Item>
                
            </Form>
        </Create>
    );
};
