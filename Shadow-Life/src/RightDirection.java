import bagel.Image;

public class RightDirection extends Actor{
    private double x, y;
    public void setX(double x) {
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
    }
    RightDirection(String imageName){
        //create Gatherer's parent class first
        super(imageName);
    }


    @Override
    protected void update(Actor actor) {
        actor.goRight();
    }

}
