import bagel.Font;
import bagel.Image;

public class Hoard extends Actor {
    protected int numberFruits = 0;

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
    @Override
    public int getFruits(){
        return numberFruits;
    }
    Hoard(String imageName) {
        //create Gatherer's parent class first
        super(imageName);
    }
    @Override
    public void updateFruits(boolean add){
        if (add){
            numberFruits += 1;
        }
        else{
            numberFruits -= 1;
        }
    }
    protected void update(Actor actor) {
        actor.collideHoard(this);
    }

}

