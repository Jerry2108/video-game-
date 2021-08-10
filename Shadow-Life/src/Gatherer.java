import bagel.Image;



class Gatherer extends Actor{
    private long lastTime = -1;
    private int xSpeed  = -1;
    private int ySpeed = 0;
    Gatherer(String imageName) {
        //create Gatherer's parent class first
        super(imageName);
        super.xSpeed = xSpeed;
        super.ySpeed = ySpeed;
    }
    Gatherer(Image image, int xSpeed, int ySpeed, double x, double y) {
        //create Gatherer's parent class first
        super(image, xSpeed, ySpeed, x, y);
    }
    @Override
    protected void update(Actor target){
        if (target instanceof Thief){

            System.out.println("Standing on Thief");
            System.out.println("before 270: + " + target.xSpeed  + target.ySpeed);
            target.rotate270ClockWise();
            System.out.println("after 270: + " + target.xSpeed + target.ySpeed);
        }
    }
    @Override
    protected Actor createNewActor(Image image, int xSpeed,int ySpeed,double x,double y){
        return new Gatherer(image,xSpeed, ySpeed, x, y);
    }
    @Override
    public void collideStockPile(Actor stockPile){
        if (super.carrying){
            super.carrying = false;
            stockPile.updateFruits(true);
        }
        super.rotate180();
    }
    @Override
    public void collideHoard(Actor hoard){
        if (super.carrying){
            super.carrying = false;
            hoard.updateFruits(true);
        }
        super.rotate180();
    }
    @Override
    public void collideTree(Actor tree){
        if (tree.getFruits() > 0) {
            if (!super.carrying) {
                super.carrying = true;
                tree.updateFruits(false);
                super.rotate180();
            }
        }
    }


}
