package automail;

import simulation.IMailDelivery;

public class Automail {

    private Robot[] robots;
    private MailPool mailPool;
    
    public Automail(MailPool mailPool, IMailDelivery delivery, int numRegRobots, int numFastRobots, int numBulkRobots) {  	
    	/** Initialize the MailPool */
    	
    	this.mailPool = mailPool;
    	
    	/** Initialize robots, currently only regular robots */
    	int totalRobots = numRegRobots + numFastRobots + numBulkRobots;
    	robots = new Robot[totalRobots];
    	for (int i = 0; i < numRegRobots; i++) robots[i] = new RegularRobot(delivery, mailPool, i);
    	for (int i = numRegRobots; i < (numRegRobots+ numBulkRobots); i++) robots[i] = new BulkRobot(delivery, mailPool, i);
    	for (int i =  (numRegRobots+ numBulkRobots); i < totalRobots; i++) robots[i] = new FastRobot(delivery, mailPool, i);
       
    }

    public Robot[] getRobots() {
        return robots;
    }

    public MailPool getMailPool() {
        return mailPool;
    }
    public int regOpTime() {
    	int time = 0;
    	for(int i = 0 ; i <robots.length ; i++) {
    		if(robots[i] instanceof RegularRobot) {
    			time += robots[i].getWaitTime();
    		}
    	}
    	return time;
    }
    public int bulkOpTime() {
    	int time = 0;
    	for(int i = 0 ; i <robots.length ; i++) {
    		if(robots[i] instanceof BulkRobot) {
    			time += robots[i].getWaitTime();
    		}
    	}
    	return time;
    }
    
    public int fastOpTime() {
    	int time = 0;
    	for(int i = 0 ; i <robots.length ; i++) {
    		if(robots[i] instanceof FastRobot) {
    			time += robots[i].getWaitTime();
    		}
    	}
    	return time;
    }
}
