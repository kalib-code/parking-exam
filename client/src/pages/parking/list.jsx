
import {
    List,
    Table,
    useTable,
    getDefaultSortOrder,
    Space,
    DeleteButton,
} from "@pankod/refine-antd";



export const ParkingList = () => {
    const { tableProps, sorter } = useTable({
        metaData: {
            fields: "*",
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
                    dataIndex="gate"
                    title="Gate"
                />

                <Table.Column
                    dataIndex="types"
                    title="Types"
                />

                <Table.Column
                    dataIndex="number"
                    title="Parking Number"
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