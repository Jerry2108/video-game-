import bagel.Image;

public class LeftDirection extends Actor{
    /*public void setX(double x) {
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
    LeftDirection(String imageName){
        //create Gatherer's parent class first
        super(imageName);
    }
    protected void update(Actor actor){
        actor.goLeft();
    }


}
