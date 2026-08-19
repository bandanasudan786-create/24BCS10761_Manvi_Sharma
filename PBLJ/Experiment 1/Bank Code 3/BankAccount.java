public class BankAccount
{
    private String accountNumber;
    private double balance;

    public BankAccount(String accountNumber, double balance) 
    {
        this.accountNumber=accountNumber;
        this.balance=balance;
    }

    public double getBalance() 
    {
        return balance;
    }

    public void setBalance(double amount) 
    {
        if (amount >= 0) {
            this.balance = amount;
        } 
        else 
        {
            System.out.println("balance cannot be negative");
        }
    }

    public void deposit(double amount) 
    {
        if (amount > 0) 
        {
            balance += amount;
        } 
        else 
        {
            System.out.println("error");
        }
    }

    public void withdraw(double amount) 
    {
        if (amount >0 && amount <=balance) 
        {
            balance-=amount;
        } 
        else 
        {
            System.out.println("error");
        }
    }
    public static void main(String[] args) {
        BankAccount account = new BankAccount("123456789", 12345.0);
        System.out.println("Initial Balance:"+account.getBalance());
        account.deposit(505.0);
        System.out.println("Balance after deposit:"+account.getBalance());
        account.withdraw(404.0);
        System.out.println("Balance after withdrawal:"+account.getBalance());
    }
}

/*Output
Initial Balance:12345.0
Balance after deposit:12850.0
Balance after withdrawal:12446.0
 */