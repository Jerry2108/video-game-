import bagel.Font;
import bagel.Image;

import java.awt.*;

public class StockPile extends Actor{
    private int numberFruits = 0;
    StockPile(String imageName){
        //create Gatherer's parent class first
        super(imageName);
    }
    protected void update(Actor actor) {
        actor.collideStockPile(this);
        //font.drawString(Integer.toString(numberFruits), (int)(super.x-1), (int)(super.y-1));
    }
    public int getFruits(){
        return numberFruits;
    }
    public void updateFruits(boolean add){
        if (add){
            numberFruits += 1;
        }
        else{
            numberFruits -= 1;
        }
    }
    protected Actor createNewActor(Image image, int xSpeed, int ySpeed, double x, double y){
        return null;
    }
}