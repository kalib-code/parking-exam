
import {
    List,
    Table,
    useTable,
    getDefaultSortOrder,
    FilterDropdown,
    Select,
    useSelect,
    Space,
    EditButton,
    DeleteButton,
} from "@pankod/refine-antd";



export const TicketList = () => {
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
                    dataIndex="vehicle_type"
                    title="Vehicle Type"
                />

                <Table.Column
                    dataIndex="gate"
                    title="Gate"
                />

                <Table.Column
                    dataIndex="vehicle_no"
                    title="Vehichle No"
                />

                <Table.Column
                    dataIndex="time_in"
                    title="Time In"
                    defaultSortOrder={getDefaultSortOrder("time_in", sorter)}
                    sorter={{ multiple: 2 }}
                />

                
                <Table.Column
                    dataIndex="allocated_space"
                    title="Parking Space"
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