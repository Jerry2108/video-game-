import java.lang.Math;
import java.util.*;
import bagel.Image;
import bagel.Font;
import java.util.ArrayList;
abstract class Actor implements Collide{
    protected double x;
    protected double y;
    protected int xSpeed;
    protected int ySpeed;
    protected boolean active = true;
    protected int NUMBER_STEPS = 64;
    protected final int NUMBER_ROTATIONS = 3;
    protected boolean carrying = false;
    protected boolean consuming = false;
    private long lastTime = -1;
    private static final double ANGLE = 90.0;
    protected ArrayList<Actor> movingActors;
    public static Font font = new Font("VeraMono.ttf", 20);
    //how far in pixels an Actor object has to move
    protected Image image;
    protected boolean isUpdated = false;

    //instantiate the Actor object by giving an image
    Actor(String imageName) {
        image = new Image(imageName);
    }

    Actor(Image image, int xSpeed, int ySpeed, double x, double y) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.drawImage();
    }

    Actor(Image image) {
        this.image = image;
    }

    //set the x coordinate
    public void setX(double x) {
        this.x = x;
    }

    //set the y coordinate
    public double getY() {
        return y;
    }

    public double getX() {
        return x;
    }

    //set the y coordinate
    public void setY(double y) {
        this.y = y;
    }

    //draw the image
    public void drawImage() {
        image.draw(x, y);
    }

    public void updatePosition(ArrayList<Actor> stationaryActors, ArrayList<Actor> movingActors) {
        this.movingActors = movingActors;
        for (Actor actor : stationaryActors) {
            if (x == actor.getX() && y == actor.getY()) {
                actor.update(this);
                /*if (actor instanceof Fence){
                    System.out.println("After x and y :"+ x + y);
                }*/
                isUpdated = true;
                return;
            }
        }
    }

    protected void move(boolean forward) {
        if (forward) {
            x += NUMBER_STEPS * xSpeed;
            y -= NUMBER_STEPS * ySpeed;
        } else {
            x -= NUMBER_STEPS * xSpeed;
            y += NUMBER_STEPS * ySpeed;
        }

    }
    protected void goUp() {
        xSpeed = 0;
        ySpeed = 1;
    }

    protected void goDown() {
        xSpeed = 0;
        ySpeed = -1;
    }

    protected void goLeft() {
        xSpeed = -1;
        ySpeed = 0;
    }

    protected void goRight() {
        xSpeed = 1;
        ySpeed = 0;
    }

    protected void rotate180() {
        xSpeed *= -1;
        ySpeed *= -1;
    }

    protected void rotate90AntiClockWise() {
        int tmpSpeed = xSpeed;
        xSpeed = -ySpeed;
        ySpeed = tmpSpeed;
    }

    protected void rotate90ClockWise() {
        int tmpSpeed = xSpeed;
        xSpeed = ySpeed;
        ySpeed = -tmpSpeed;
    }
    public void rotate270ClockWise(){

        for (int i = 0; i < NUMBER_ROTATIONS; i++){
            this.rotate90ClockWise();
        }
    }
    protected void updateActorList(Actor actor1, Actor actor2) {
        movingActors.add(actor1);
        movingActors.add(actor2);
        movingActors.remove(this);
    }

    protected abstract void update(Actor target);

    public void setLastTime(long lastTime) {
        this.lastTime = lastTime;
    }

    public long getLastTime() {
        return lastTime;
    }

    public boolean getIsUpdated() {
        return isUpdated;
    }

    public void updateActive() {
        if (active) {
            this.move(true);
            //this.drawImage();
        }
    }

    protected Actor produceNewActor() {
        return this.createNewActor(image, xSpeed, ySpeed, x, y);
    }

    protected Actor createNewActor(Image image, int xSpeed, int ySpeed, double x, double y) {
        return null;
    }

    public void collideStockPile(Actor stockPile) {
        collideStockPile(stockPile);
    }

    public void collideHoard(Actor hoard) {
        collideHoard(hoard);
    }

    public void collideTree(Actor tree) {
        collideTree(tree) ;
    }
    public void updateFruits(boolean add) {
    }
    public int getFruits() {
        return -1;
    }
    public void collidePad() {
        collidePad();
    }
    public void collideFence(){
        active = false;
        rotate180();
        move(true);
    }

}





