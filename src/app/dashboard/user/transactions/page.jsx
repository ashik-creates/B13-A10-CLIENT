import TransactionHistoryTable from "@/components/user/TransactionHistoryTable";
import { getPaymentsByUser } from "@/lib/api/payment";
import { getUserSession } from "@/lib/getSession";

const TransactionsPage = async() => {
    const user = await getUserSession();
    const transactions = await getPaymentsByUser(user.id);
    return (
        <div>
           <TransactionHistoryTable transactions={transactions} />
        </div>
    );
};

export default TransactionsPage;