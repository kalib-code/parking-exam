
import {
    useForm,
    Create,
    Form,
    Input,
    Select,
    TimePicker,
    useSelect
} from "@pankod/refine-antd";


export const PaymentCreate = () => {
    const { formProps, saveButtonProps } = useForm();

    const { selectProps } = useSelect({
        resource: "tickets",
        onSearch: (value) => [
            {
                field: "vehicle_no",
                operator: "containss",
                value,
            },
        ],
        optionLabel: "vehicle_no",
        optionValue: "id",
      });



    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
                <Form.Item label="Time out" name="time_out">
                <TimePicker />
                </Form.Item>
                <Form.Item
          label="Vehicle Number"
          name="ticket"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Select {...selectProps} />
        </Form.Item>
            </Form>
        </Create>
    );
};
