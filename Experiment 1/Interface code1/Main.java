interface Drivable
{
    void drive();
}

class Vehicle
{
    String brand;
    int speed;

    Vehicle(String brand, int speed) {
        this.brand = brand;
        this.speed = speed;
    }
    void move() 
    {
        System.out.println(brand + " is moving at "+ speed);
    }
}

class Car extends Vehicle implements Drivable 
{
    int seats;

    Car(String brand, int speed, int seats) 
    {
        super(brand, speed);
        this.seats = seats;
    }
    public void drive() 
    {
        System.out.println(brand + "driven");
    }
    void display() 
    {
        System.out.println("Brand:" + brand);
        System.out.println("Speed:" + speed);
        System.out.println("Seats:" + seats);
    }
}

public class Main 
{
    public static void main(String[] args) {
        Car car = new Car("Toyota", 120, 5);

        car.move();
        car.drive();
        car.display();
    }
}

/*output
Toyota is moving at 120
Toyotadriven
Brand:Toyota
Speed:120
Seats:5 */