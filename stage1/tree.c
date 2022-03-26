#include <assert.h>
#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#define DIMENSION 2
#define DIMENSIONS 2
typedef struct record record_t;
typedef struct{
    char *census_year;
    char *block_id;
    char *property_id;
    char *base_id;
    char *area;
    char *trading;
    char *industry_code;
    char *industry_des;
    char *x;
    char *y;
    char *loc;
	double point[DIMENSIONS];
}data_t;
struct record{
	data_t *data;
	record_t *next;
	record_t *similarLastOne;
	record_t *left;
	record_t *right;
};
typedef struct{
	record_t *current_record;
}tree_t;
typedef struct{
	record_t *closest_record;
	double distance;
	int count;
}closest_t;

tree_t *make_empty_tree();
record_t *recursive_insert(record_t *current_record, record_t *new_record,int depth);
tree_t *insert_in_order(tree_t *tree, data_t *information);
void find_the_closest_point(record_t *current_record, closest_t* closest,double *loc, int depth);
double calculate_distance(double* p1, double* p2);
void free_tree(tree_t *tree);
void free_record(record_t *current_record);
void recursive_free_tree(record_t *current_record);


tree_t *make_empty_tree(){
	tree_t *tree = (tree_t*)malloc(sizeof(tree_t));
	assert(tree != NULL);
	/*initialize a tree to be empty*/
	tree->current_record = NULL;
	return tree;
}

record_t* recursive_insert(record_t *current_record, record_t *new_record,int depth){
	if (!current_record){
		return new_record;
	}
	/*identify which coordinate need to compared , compared coordinate(cc)*/
	int cc = depth % DIMENSIONS;
	/*identify the left coordianate (lc) */
    int lc = 0;
	if (!cc){
		lc = 1;
	}
	/*x aligned so compare with x*/
	if ((current_record->data->point)[cc] <= (new_record->data->point)[cc]
	&& (current_record->data->point)[lc] != (new_record->data->point)[lc]){
		current_record->right = recursive_insert(current_record->right, new_record, depth + 1);
	}
	/*check if there has been a list available. If there is no list created, create one*/
	else if ((current_record->data->point)[cc] == (new_record->data->point)[cc] &&
	(current_record->data->point)[lc] == (new_record->data->point)[lc]){
		if (!(current_record->next)){
			record_t *first_record = current_record;
			while(first_record->next != NULL){
				first_record = first_record->next;
			}
			first_record->next = new_record;
		}
	}
	else {
		current_record->left =  recursive_insert(current_record->left, new_record, depth + 1);
    }
	return current_record;
}
tree_t *insert_in_order(tree_t *tree, data_t *information){
	/*make a new record*/
	record_t *new_record = (record_t*)malloc(sizeof(record_t));
	assert(tree != NULL && new_record != NULL && information != NULL);
	new_record->data = information;
	new_record->left = new_record->right = new_record->next = NULL;
	/*and insert it into the tree*/
    tree->current_record = recursive_insert(tree->current_record, new_record, 0);
	return tree;
}
void print_a_tree(record_t* current_record){
	/*use preorder traversal */
    if (!current_record){
        return;
    }
	record_t *first = current_record;
	if ((current_record->data->point[0] == 144.959522) && (current_record->data->point[1] == 37.800095)){
			printf("found\n\n");
	}
    int count = 0;
	while(first){
        count++;
		first = first->next;
	}
	print_a_tree(current_record->left);
	print_a_tree(current_record->right);
}
void find_the_closest_point(record_t *current_record, closest_t* closest,double loc[], int depth){
	if(!current_record){
		return;
	}
	double distance;
	printf("current point is %lf %lf\n\n", current_record->data->point[0], current_record->data->point[1]);
	/*in case this is the first time u search*/
	if (!closest-> closest_record ){
		closest->closest_record = current_record;
		closest->distance = calculate_distance(current_record->data->point, loc);
	}
	else{
		distance = calculate_distance(current_record->data->point, loc);
		if (distance < closest->distance){
			closest->closest_record = current_record;
			closest->distance = distance;
		}
	}
    double boundary[DIMENSION];
	/*location is (2,6), dimension is 1, root is (6,7)*/
	/*identify which direction u need to go*/
    if(depth % 2){
        boundary[0] = loc[0];
        boundary[1] = current_record->data->point[1];
		/*go to the left*/
		if (boundary[1] > loc[1]){
			find_the_closest_point(current_record->left, closest, loc, depth+1);
			if (calculate_distance(boundary, loc) < closest->distance){
				find_the_closest_point(current_record->right, closest, loc, depth+1);
			}
		}
		else{
			find_the_closest_point(current_record->right, closest, loc, depth + 1);
			if (calculate_distance(boundary, loc) < closest->distance){
				find_the_closest_point(current_record->left, closest, loc, depth+1);
			}
		}
    }
    else{
        boundary[0] = current_record->data->point[0];
        boundary[1] = loc[1];
		if (boundary[0] > loc[0]){
			find_the_closest_point(current_record->left, closest, loc, depth+1);
			if (calculate_distance(boundary, loc) < closest->distance){
				find_the_closest_point(current_record->right, closest, loc, depth+1);
			}
		}
		else{
			find_the_closest_point(current_record->right, closest, loc, depth + 1);
			 if (calculate_distance(boundary, loc) < closest->distance){
				find_the_closest_point(current_record->left, closest, loc, depth+1);
			}
		}
	}
	closest->count += 1;
}


