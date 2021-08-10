import bagel.Image;

class Pool extends Actor {
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
    Pool(String imageName){
        super(imageName);
    }


    @Override
    protected void update(Actor actor) {
        Actor newMovingActor1 = actor.produceNewActor();
        Actor newMovingActor2 = actor.produceNewActor();
        actor.updateActorList(newMovingActor1 , newMovingActor2);
        newMovingActor1.drawImage();
        newMovingActor1.move(true);
        newMovingActor1.drawImage();
        newMovingActor2.drawImage();
        newMovingActor2.move(true);
        newMovingActor2.drawImage();

    }


}


