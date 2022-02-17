
import {
    List,
    Table,
    useTable,
    getDefaultSortOrder,
    Space,
    DeleteButton,
} from "@pankod/refine-antd";



export const PaymentList = () => {
    const { tableProps, sorter } = useTable({
        metaData: {
            fields: "*",
            populate:["ticket"]
        },
    });

    return (
        <List>
            <Table
                {...tableProps}
                rowKey="id"
                pagination={{
                    ...tableProps.pagination,
                    showSizeChanger: true,
                }}
            >
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    sorter={{ multiple: 3 }}
                />

                <Table.Column
                    dataIndex="total_hours"
                    title="Total Hours  "
                />

                <Table.Column
                    dataIndex="time_out"
                    title="Time Out"
                />

                <Table.Column
                    dataIndex={["ticket","id"]}
                    title="Ticket ID"
                />
                 <Table.Column
                    dataIndex="total_amount"
                    title="Total Amount (PHP)"
                />
                <Table.Column
                    title="Actions"
                    render={(_, record) => (
                        <Space>
                            <DeleteButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};