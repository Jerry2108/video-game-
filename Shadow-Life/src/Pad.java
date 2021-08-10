import bagel.Image;

public class Pad extends Actor{
    /*private double x, y;
    public void setX(double x) {
        this.x = x;
    }
    public void setY(double y) {
        this.y = y;
    }
    public void drawImage() {
        image.draw(x, y);
    }
    public double getY() {
        return y;
    }
    public double getX() {
        return x;
    }*/
    Pad(String imageName) {
        //create Gatherer's parent class first
        super(imageName);

    }
    protected void update(Actor target) {
        System.out.println("collide pad");
        target.collidePad();
    }
}
