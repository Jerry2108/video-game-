import bagel.Image;
import java.util.ArrayList;
import java.util.List;

public class Thief extends Actor {
    private final int initialXspeed = 0;
    private final int initialYspeed = 1;

    Thief(String imageName) {
        super(imageName);
        super.xSpeed = initialXspeed;
        super.ySpeed = initialYspeed;
    }

    Thief(Image image, int xSpeed, int ySpeed, double x, double y) {
        //create Gatherer's parent class first
        super(image, xSpeed, ySpeed, x, y);
    }
    @Override
    protected void update(Actor target){
        if (target instanceof Gatherer){
            super.rotate270ClockWise();
        }
    }
    @Override
    protected Actor createNewActor(Image image, int xSpeed, int ySpeed, double x, double y) {
        return new Thief(image, xSpeed, ySpeed, x, y);
    }
    @Override
    public void collideStockPile(Actor stockPile) {
        if (!super.carrying) {
            if (stockPile.getFruits() > 0) {
                super.carrying = true;
                super.consuming = false;
                stockPile.updateFruits(false);
                super.rotate90ClockWise();
            }
        }
        else{
            super.rotate90ClockWise();
        }

        System.out.println(x);
    }
    @Override
    public void collideHoard(Actor hoard) {
        if (super.consuming) {
            super.consuming = false;
            if (!super.carrying) {
                if (hoard.getFruits() > 0) {
                    super.carrying = true;
                    hoard.updateFruits(false);
                } else {
                    //System.out.println("rotate now1");
                    super.rotate90ClockWise();
                }
            }
        }
        else if (super.carrying) {
            super.carrying = false;
            hoard.updateFruits(true);
            super.rotate90ClockWise();
        }
    }
    @Override
    public void collideTree(Actor tree){
        if (!super.carrying) {
            if (tree instanceof Tree && tree.getFruits() > 0) {
                tree.updateFruits(false);
                super.carrying = true;
            }
            else if (tree instanceof GoldenTree) {
                super.carrying = true;
            }
        }
    }
    @Override
    public void collidePad(){
        super.consuming = true;
    }
    @Override
    public void collideFence(){

    }


}
