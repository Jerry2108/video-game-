import bagel.Image;

public class Fence extends Actor{
    private double x;
    private double y;
    Fence(String imageName){
        super(imageName);
    }

    /*public void setX(double x) {
        this.x = x;
    }
    public void setY(double y) {
        this.y = y;
    }

    public double getY() {
        return y;
    }
    public double getX() {
        return x;
    }
    public void drawImage() {
        image.draw(x, y);
    }*/
    @Override
    protected void update(Actor target) {
        target.collideFence();
    }

}
