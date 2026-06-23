import { Table, Chip } from "@heroui/react";

const TransactionHistoryTable = ({ transactions = [] }) => {
  return (
    <div className="rounded-3xl border border-divider bg-content1 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Transaction History</h2>

        <p className="text-sm text-default-500">
          View all your Stripe payment transactions.
        </p>
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Transaction history table"
            className="w-full"
          >
            <Table.Header>
              <Table.Column isRowHeader>
                Transaction ID
              </Table.Column>

              <Table.Column>Ticket</Table.Column>

              <Table.Column>Amount</Table.Column>

              <Table.Column>Quantity</Table.Column>

              <Table.Column>Payment Date</Table.Column>

              <Table.Column>Status</Table.Column>
            </Table.Header>

            <Table.Body>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <Table.Row key={transaction._id}>
                    <Table.Cell>
                      <div className="max-w-[220px] truncate font-mono text-xs">
                        {transaction.sessionId}
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="font-semibold">
                        {transaction.ticketName}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="font-semibold text-success">
                        ৳{transaction.totalAmount}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      {transaction.quantity}
                    </Table.Cell>

                    <Table.Cell>
                      <div className="text-sm">
                        {new Date(
                          transaction.createdAt
                        ).toLocaleDateString()}

                        <div className="text-xs text-default-500">
                          {new Date(
                            transaction.createdAt
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <Chip color="success" variant="flat">
                        Paid
                      </Chip>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell>No transactions found</Table.Cell>
                  <Table.Cell />
                  <Table.Cell />
                  <Table.Cell />
                  <Table.Cell />
                  <Table.Cell />
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        <Table.Footer>
          <div className="px-4 py-2 text-sm text-default-500">
            Total Transactions: {transactions.length}
          </div>
        </Table.Footer>
      </Table>
    </div>
  );
};

export default TransactionHistoryTable;