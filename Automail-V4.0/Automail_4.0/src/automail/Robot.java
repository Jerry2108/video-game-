package automail;

import exceptions.ExcessiveDeliveryException;

import exceptions.ItemTooHeavyException;
import simulation.Clock;
import simulation.IMailDelivery;

/**
 * The robot delivers mail!
 */
public abstract class Robot {

    protected static final int INDIVIDUAL_MAX_WEIGHT = 2000;

    protected IMailDelivery delivery;
    //protected final String id;
    /** Possible states the robot can be in */
    public enum RobotState { DELIVERING, WAITING, RETURNING }
    protected RobotState current_state;
    protected int current_floor;
    protected int destination_floor;
    protected MailPool mailPool;
    protected boolean receivedDispatch; 
    protected final double rate; 
    
    protected int waitTime = 0;
    

    protected int deliveryCounter;
    

    /**
     * Initiates the robot's location at the start to be at the mailroom
     * also set it to be waiting for mail.
     * @param delivery governs the final delivery
     * @param mailPool is the source of mail items
     */
    public Robot(IMailDelivery delivery, MailPool mailPool, double rate){
        // current_state = RobotState.WAITING;
    	current_state = RobotState.RETURNING;
        current_floor = Building.getInstance().getMailroomLocationFloor();
        this.delivery = delivery;
        this.mailPool = mailPool;
        this.receivedDispatch = false;
        this.deliveryCounter = 0;
        this.rate = rate;
        
    }
    
    /**
     * This is called when a robot is assigned the mail items and ready to dispatch for the delivery 
     */
    public void dispatch() {
    	receivedDispatch = true;
    }

    /**
     * This is called on every time step
     * @throws ExcessiveDeliveryException if robot delivers more than the capacity of the tube without refilling
     */
    public abstract void operate() throws ExcessiveDeliveryException;

    public abstract boolean isEmpty();
    
    public abstract String getIdTube();
    
    protected void addToHand(MailItem mailItem)throws ItemTooHeavyException {};
    
    protected void addToTube(MailItem mailItem)throws ItemTooHeavyException {};
    
    protected int getTubeSize() {return 0;};
    
    public abstract int getWaitTime();
    

}
