import java.util.ArrayList;
import java.util.LinkedList;

public class Main
{
    public static void main(String[] args)
    {
        ArrayList<ArrayList<Integer>> inventory = new ArrayList<>();

        ArrayList<Integer> section0 = new ArrayList<>();
        section0.add(5);
        section0.add(12);
        section0.add(3);

        ArrayList<Integer> section1 = new ArrayList<>();
        section1.add(8);
        section1.add(2);
        section1.add(15);

        ArrayList<Integer> section2 = new ArrayList<>();
        section2.add(1);
        section2.add(20);
        section2.add(4);

        inventory.add(section0);
        inventory.add(section1);
        inventory.add(section2);

        LinkedList<Integer> reorder = new LinkedList<>();

        for (ArrayList<Integer> section : inventory)
        {
            for (int stock : section)
            {
                if (stock < 5)
                {
                    reorder.add(stock * 2);
                }
            }
        }

        System.out.println("Warehouse Inventory:");

        for (int i = 0; i < inventory.size(); i++)
        {
            System.out.println("Section " + i + ": " + inventory.get(i));
        }

        System.out.println("Target Reorder Quantities: " + reorder);
    }
}
/*Output
Warehouse Inventory:
Section 0: [5, 12, 3]
Section 1: [8, 2, 15]
Section 2: [1, 20, 4]
Target Reorder Quantities: [6, 4, 2, 8]
 */