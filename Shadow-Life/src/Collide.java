public interface Collide{
    abstract void collideStockPile(Actor stockPile);
    abstract void collideHoard(Actor hoard);
    abstract void collideTree(Actor tree);
    abstract void collidePad();
    abstract void collideFence();
}
