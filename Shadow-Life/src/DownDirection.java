import bagel.Image;

public class DownDirection extends Actor {
    private double x, y;
    DownDirection(String imageName) {
        //create Gatherer's parent class first
        super(imageName);

    }

    /*public double getY() {
        return y;
    }
    public double getX() {
        return x;
    }
    public void setX(double x) {
        this.x = x;
    }
    public void setY(double y) {
        this.y = y;
    }
    public void drawImage() {
        image.draw(x, y);
    }*/
    @Override
    protected void update(Actor actor){
        actor.goDown();
    }

    protected Actor createNewActor(Image image, int xSpeed, int ySpeed, double x, double y){
        return null;
    }
}
