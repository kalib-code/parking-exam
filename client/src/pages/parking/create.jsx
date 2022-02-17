
import {
    useForm,
    Create,
    Form,
    Input,
    Select,
} from "@pankod/refine-antd";


export const ParkingCreate = () => {
    const { formProps, saveButtonProps } = useForm();
    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
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
                <Form.Item label="Parking Vehicle Type" name="types">
                    <Select
                        options={[
                            {
                                label: "Small",
                                value: "SP",
                            },
                            {
                                label: "Medium",
                                value: "MP",
                            },
                            {
                                label: "Large",
                                value: "LP",
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Parking Number" name="number">
                    <Input />
                </Form.Item>
                
            </Form>
        </Create>
    );
};
