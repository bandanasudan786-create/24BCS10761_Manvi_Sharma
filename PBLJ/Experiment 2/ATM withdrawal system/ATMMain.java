import java.util.Scanner;
import java.util.InputMismatchException;

class InsufficientFundsException extends Exception
{
    private double missingAmount;
    public InsufficientFundsException(double missingAmount)
    {
        super("Insufficient... Missing amount: " + missingAmount);
        this.missingAmount = missingAmount;
    }

    public double getMissingAmount()
    {
        return missingAmount;
    }
}

class BankAccount
{
    private double balance = 500.00;
    public void withdraw(double amount) throws InsufficientFundsException
    {
        if(amount <= 0)
        {
            throw new IllegalArgumentException("Withdrawal amount must be greater than zero.");
        }
        if (amount > balance)
        {
            double missing = amount - balance;
            throw new InsufficientFundsException(missing);
        }
        balance -= amount;
        System.out.println("Withdrawal success...");
        System.out.println("New balance:" + balance);
    }
}

public class ATMMain
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);
        BankAccount account = new BankAccount();

        try
        {
            System.out.print("Enter withdraw amount:");
            double amount = sc.nextDouble();
            account.withdraw(amount);
        }
        catch (InsufficientFundsException e)
        {
            System.out.println(e.getMessage());
        }
        catch (IllegalArgumentException e)
        {
            System.out.println(e.getMessage());
        }
        catch (InputMismatchException e)
        {
            System.out.println("Invalid input ENTER NO.");
        }
        finally
        {
            System.out.println("terminated.");
            sc.close();
        }
    }
}

/*Output
Enter withdraw amount:44
Withdrawal success...
New balance:456.0
terminated.
 */