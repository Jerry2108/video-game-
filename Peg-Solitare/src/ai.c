#include <time.h>
#include <stdlib.h>
#include <limits.h>
#include <math.h>
#include <assert.h> 
#include "ai.h"
#include "utils.h"
#include "hashtable.h"
#include "stack.h"

/*copy one state of the board to that of another*/ 
void copy_state(state_t* dst, state_t* src){
	/*Copy field*/
	memcpy( dst->field, src->field, SIZE*SIZE*sizeof(int8_t) );
	dst->cursor = src->cursor;
	dst->selected = src->selected;
}

/* Saves the path up to the node as the best solution found so far */
void save_solution( node_t* solution_node ){
	node_t* n = solution_node;
	/*save solution step by step until there is no parent*/ 
	while( n->parent != NULL ){
		copy_state( &(solution[n->depth]), &(n->state));
		solution_moves[n->depth-1] = n->move;
		n = n->parent;
	}
	solution_size = solution_node->depth;
}

/*initialize the first node*/ 
node_t* create_init_node( state_t* init_state ){
	node_t * new_n = (node_t* ) malloc(sizeof(node_t));
	assert(new_n != NULL);
	new_n->parent = NULL;	
	new_n->depth = 0;
	/*copy the state given to that of the new node*/ 
	copy_state(&(new_n->state), init_state);
	return new_n;
}

/* Apply an action to node n and return a new node resulting from executing the action */
node_t* applyAction(node_t* n, position_s* selected_peg, move_t action ){
	assert(n != NULL && selected_peg != NULL); 
    node_t* child_node = (node_t* )malloc(sizeof(node_t)); 
	/*copy the state from the parent node before updating*/
	copy_state(&(child_node->state),&(n->state)); 
	/*provide the child node's action with the input action*/
	child_node->move = action; 
	/*update the parent node*/
	child_node->parent = n; 
	/*update the depth of the child node*/
	child_node->depth = n->depth + 1; 
	/*update the cursor's position*/
	child_node->state.cursor.x = selected_peg->x; 
	child_node->state.cursor.y = selected_peg->y; 
	/*move the cursor*/ 
	execute_move_t(&(child_node->state), &(child_node->state.cursor), action); 
	return child_node; 
}

/* Find a solution path as per algorithm description in the handout*/
void find_solution(state_t* init_state){
	assert(init_state != NULL);
	HashTable table;
	/* Choose initial capacity of PRIME NUMBER*/
	/*Specify the size of the keys and values you want to store once*/
	ht_setup( &table, sizeof(int8_t) * SIZE * SIZE, sizeof(int8_t) * SIZE * SIZE, 16769023);
	/*Initialize Stack*/
	initialize_stack();
	/*Add the initial node*/
	node_t* node = create_init_node(init_state);
	/*a linked list is created to store all popped nodes later*/
	list_t *list = make_empty_list(); 
	list = insert_at_foot(list, node);
	/*push the 1st node into the stack*/
	stack_push(node); 
	/*initialize remaining pegs which is the total number of pegs initially*/
	int remaining_pegs = num_pegs(&(node->state)); 
	int count = 0; 
	/*start running the algorithm until the stack is empty*/ 
	while(!is_stack_empty()){
		node_t* n = stack_top(); 
		stack_pop();
		expanded_nodes += 1;  
		/*update the number of pegs if the number of pegs 
		of the current state is smaller than the number remaining*/
		if (num_pegs(&(n->state)) < remaining_pegs){
			save_solution(n);
			remaining_pegs = num_pegs(&(n->state)); 
		}
		/*move the peg to different direction to generate new nodes*/
		for (int i = 0; i < SIZE;i++ ){
			for (int j = 0; j < SIZE; j++){
				position_s position; 
				position.x = i; 
				position.y = j;
				for(move_t jump = left; jump <= down; jump++){
					/*if the current position of the peg is valid, add it to the list
					and generate new nodes*/ 
					if(can_apply(&(n->state),&position, jump)){
						node_t* child_node = applyAction(n,&position,jump);  
						list = insert_at_foot(list, child_node); 
						generated_nodes += 1; 
						/*if only 1 peg left, the puzzle has solved, stop
						the simulation*/
						if (won(&(child_node->state))){
							save_solution(child_node); 
							remaining_pegs = num_pegs(&(child_node->state)); 
							ht_destroy(&table);
							free_list(list);
							return; 
						}
						/*if this state hasn't been generated before, add it
						to the hash table to look up later and add the node to the stack*/ 
						if (!ht_contains(&table,&(child_node->state.field) )){
							int isInsert = ht_insert(&table, &(child_node->state.field), &(child_node->state.field));
							stack_push(child_node); 
						}
						
					}
				}
			}
		}
		/*stop the simulation if the number of expanded nodes exceed the budget allowed*/ 
		if(expanded_nodes >= budget){
			ht_destroy(&table); 
			free_list(list); 
			return; 
		}
	}
	/*free the linked list and hash table*/ 
	ht_destroy(&table); 
	free_list(list); 
}

/*make an empty list*/ 
list_t *make_empty_list(void) {
	list_t *list;
	list = (list_t*)malloc(sizeof(*list));
	assert(list!=NULL);
	list->head = list->foot = NULL;
	return list;
}

/*insert into the linked list*/
list_t *insert_at_foot(list_t *list, node_t* new) {
	assert(list!=NULL && new!=NULL);
	new->next = NULL;
	/*if it's the first time the node added to the linked list*/ 
	if (list->foot==NULL) {
		list->head = list->foot = new;
	} 
	/*update the new node as the foot of the linked list*/ 
	else {
		list->foot->next = new;
		list->foot = new;
	}
	return list;
}

/*free the linked list*/
void free_list(list_t *list) {
	node_t *curr, *prev;
	assert(list!=NULL);
	curr = list->head;
	/*free whole the linked list step by step*/ 
	while (curr) {
		prev = curr;
		curr = curr->next;
		free(prev);
	}
	free(list);
}














