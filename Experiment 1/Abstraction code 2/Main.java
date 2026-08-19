abstract class Bank {
    private static int balance = 1000;

    public void getBalance() {
        System.out.println("the balance is "+balance);
    }

    public void setBalance(int val) {
        balance = val;
    }

    public int getCurrentBalance() {
        return balance;
    }
}

class Sbi extends Bank {

    public void debit(int bal) {
        int currVal = super.getCurrentBalance();
        currVal -= bal;
        super.setBalance(currVal);
    }

    public void credit(int bal) {
        int currVal = super.getCurrentBalance();
        currVal += bal;
        super.setBalance(currVal);
    }
}

public class Main {
    public static void main(String[] args) {

        Sbi s = new Sbi();

        s.getBalance();

        s.debit(200);
        s.getBalance();

        s.credit(500);
        s.getBalance();
    }
}

/*Output
the balance is 1000
the balance is 800
the balance is 1300
 */