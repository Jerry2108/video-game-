import bagel.Font;
import bagel.Image;

import java.util.List;
import java.awt.Graphics;
public class Tree<Gatherer> extends Actor {
    //create Tree's parent class first
    private int numberFruits = 3;


    /*private double x, y;
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
    //public void drawImage() {
        //image.draw(x, y);

    */
    Tree(String imageName){
        super(imageName);
    }

    protected void update(Actor actor) {
        actor.collideTree(this);
    }

    public void updateFruits(boolean add){
        if (add){
            numberFruits += 1;
        }
        else{
            numberFruits -= 1;
        }
    }
    public int getFruits(){
        return numberFruits;
    }

}
