//tree.h
#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <string.h>
#include "tree.c"
#define RECORD_LENGTH 512
#define FIELD_LENGTH 128
#define NUM_FIELDS 11
#define DIMENSION 2
char** separate_fields(char *line);
data_t *fill_in_information(char** fields);
tree_t *create_a_tree(char* file_name1);
void getRidOfNewLine(char* string);
void produce_outputFile(char* string1, char* string2, record_t*current, char* file_name2);

char** separate_fields(char* line){
    int i = 0, has_commas = 0, j = 0, c = 0;
    char tmp[FIELD_LENGTH + 1];
	char** fields = (char**)malloc(sizeof(char*)*(NUM_FIELDS));
	assert(fields != NULL && line != NULL);

    while(j < NUM_FIELDS){
        /*the current field doesn't have commas as its character*/
        if (line[i] == ',' && !has_commas){
            /*if there is no information to read in this field anymore, close the
			temporary array and copy it to the official array*/
            if (c != 0){
                tmp[c] = '\0';
                c = 0;
                fields[j]= (char*)malloc(sizeof(char)*(strlen(tmp)+ 1));
                assert(fields[j] != NULL);
                strcpy(fields[j++], tmp);
            }
            /*check if the next field has commas or not*/
            if (line[i+1] == '"'){
                has_commas = 1;
                /*if it has commas, skip a delimiter comma and a quotation mark following
				the comma*/
                i += 2;
            }
            else{
                i+= 1;
            }
        }
        /*there are 3 cases when the current character is a quotation mark*/
		else if (line[i] == '"'){
			/*the 1st case: the current field has double quotes and the field
			 has ended,*/
			if (line[i+1] == '"' && line[i+2] == '"') {
				tmp[c++] = line[i];
				has_commas = 0;
				/*skip double quotes following to reach the comma separating this field
				and next field*/
				i += 3;
			}
			/*the 2nd case: the current field has double quotes and there is still
			information in this field to read*/
			else if (line[i+1] == '"' && line[i+2] != '"'){
				tmp[c++] = line[i];
				i += 2;
			}
			/*the 3rd case: there are no double quotes in this field
			and the current quotation marks ends the field so we need to stop reading*/
	        else{
				/*close the temporary array and copy it to the official array*/
				tmp[c] = '\0';
				c = 0;
				has_commas = 0;
				fields[j]= (char*)malloc(sizeof(char)*(strlen(tmp)+ 1));
                assert(fields[j] != NULL);
                strcpy(fields[j++], tmp);
				i++;
			}
		}
        /*otherwise, keep getting character for the sample array*/
        else{
            tmp[c++] = line[i];
            i++;
        }
    }
	return fields;
}

/*data is get as a whole package */
data_t *fill_in_information(char** fields){
	data_t *information = (data_t*)malloc(sizeof(data_t));
	assert(information != NULL && fields != NULL);

    information->census_year = fields[0];
    information->block_id = fields[1];
    information->property_id = fields[2];
    information->base_id = fields[3];
    information->area = fields[4];
    information->trading= fields[5];
    information->industry_code = fields[6];
    information->industry_des = fields[7];
    information->x = fields[8];
    information->y = fields[9];
    information->loc = fields[10];
	/*char *c; */
	(information->point)[0] = atof(information->x);
	/*strtod(information->x, &c);*/
	(information->point)[1] = atof(information->y);
    /*strtod(information->y, &c); */
    return information;
}

/*A linked list is created based on data from the file*/
tree_t *create_a_tree(char* file_name1){
    FILE* input_file = fopen(file_name1, "r");
    assert(input_file != NULL);
    char **fields;
    tree_t *records = make_empty_tree();
    char *line = NULL;
    size_t c = 0;

    /*get a header from the file*/
    getline(&line, &c, input_file);
    /*read data line by line*/
    while (getline(&line, &c, input_file) != -1){
        /*each field is separated by commas as delimiters*/
        fields = separate_fields(line);
		assert(fields != NULL);
        /*information of one record is displayed as a struct*/
        data_t *information = fill_in_information(fields);
        /*insert new record into the kd_tree*/
        records = insert_in_order(records, information);
		free(fields);

    }
	free(line);

    /*close the input file*/
    fclose(input_file);
    return records;
}

/*the linked list is considered as a dictionary of records*/
/*produce the output file based on keys searched */
void produce_outputFile(char* string1, char* string2, record_t* current, char* file_name2){
    FILE *output_file = fopen(file_name2, "a");
    assert(output_file != NULL && current != NULL);
	record_t* tmp = current;
    if (!current){
		fprintf(output_file, "%s %s -->NOTFOUND\n", string1, string2);
		return;
	}
	/*compares the trading name of each record consecutively with the key provided*/
    while(tmp != NULL){
		tmp = current;
		/*copy a current record into the output file if they have a key required*/
		fprintf(output_file, "%s %s -->", string1, string2);
		fprintf(output_file, "Census year: %s || Block ID: %s || Property ID: %s ",
		current->data->census_year,current->data->block_id, current->data->property_id);
		fprintf(output_file, "|| Base property ID: %s || CLUE small area: %s ",
		current->data->base_id, current->data->area);
		fprintf(output_file, "|| Industry (ANZSIC4) code: %s || Industry (ANZSIC4) description: %s ",
		current->data->industry_code, current->data->industry_des);
		fprintf(output_file, "|| x coordinate: %s || y coordinate: %s || Location: %s || \n",
		current->data->x, current->data->y, current->data->loc);
		/*move to the next record*/
		tmp = tmp->next;
    }
	/*close the output file*/
	fclose(output_file);
}



int main(int argc, char** argv){
    char *name1 = argv[1];
	char *name2 = argv[2];
	char *key = NULL;
	size_t c = 0;
	double point[DIMENSION];
    tree_t *records =  create_a_tree(name1);
	closest_t* closest = (closest_t*)malloc(sizeof(closest_t));
	closest->count = 0;
	closest->closest_record = NULL;
	closest->distance = 0;
	while (getline(&key, &c, stdin) != -1){
		char* x = strtok(key, " ");
		char* tmpy = strtok(NULL, "");
		char* y = (char*)malloc(sizeof(char)*strlen(tmpy)+1);
		assert(y != NULL);
		strcpy(y, tmpy);
		getRidOfNewLine(y);
		point[0] = atof(x);
		point[1] = atof(y);
		find_the_closest_point(records->current_record,closest, point, 0);
		printf("%s %s -->%d\n", x, y, closest->count);
		produce_outputFile(x,y,closest->closest_record, name2);
		free(y);
    }
	free(closest);
	free(key);
	free_tree(records);

}

void getRidOfNewLine(char* string){
	char* newString = (char*)malloc(sizeof(char) * strlen(string) + 1);
	assert(newString != NULL);
	strcpy(newString, string);
	int i=0;

	while (i<strlen(string)){
		newString[i] = string[i];
		if ((newString[i] == '\n')||(newString[i] == '\r')||(newString[i] == ' ')){
			newString[i] = '\0';
			break;
		}
		i++;
	}
	strcpy(string, newString);
	free(newString);
}



#include <assert.h>
#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include "tree.h"
#define DIMENSION 2

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
	else if ((current_record->data->point)[0] == (new_record->data->point)[0] &&
	(current_record->data->point)[1] == (new_record->data->point)[1]){
		/*printf("identical\n");*/
		if (!(current_record->next)){
			current_record->next = new_record;
			current_record->similarLastOne = new_record;
		}
		else{
			current_record->similarLastOne->next = new_record;
			current_record->similarLastOne = new_record;

		}
		/*printf("the last one: %s\n", current_record->similarLastOne->data->trading);*/
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


double calculate_distance(double* p1, double* p2){
	double distanceX = pow(p1[0] - p2[0], 2);
	double distanceY = pow(p1[1] - p2[1], 2);
	double distance = sqrt(distanceX + distanceY);
	return distance;
}

void recursive_free_tree(record_t *current_record){
	if (!current_record){
		return;
	}
	*count_free++;
	/*free children first*/
	recursive_free_tree(current_record->left);
	recursive_free_tree(current_record->right);
	/*finally, free its parent*/
	free_record(current_record);
}
void free_tree(tree_t *tree){
	assert(tree != NULL);
	int count = 0;
	recursive_free_tree(tree->current_record);
	free(tree);
}
/*current record is a start of a linked list*/
void free_record(record_t *current_record){
    record_t *prev_record;
    /*free memory assigned to each record consecutively*/
    while(current_record){
        prev_record = current_record;
        current_record = current_record->next;
		free(prev_record->data->census_year);
        free(prev_record->data->block_id);
		free(prev_record->data->property_id);
		free(prev_record->data->base_id);
		free(prev_record->data->area);
		free(prev_record->data->trading);
		free(prev_record->data->industry_code);
		free(prev_record->data->industry_des);
		free(prev_record->data->x);
		free(prev_record->data->y);
		free(prev_record->data->loc);
		free(prev_record->data);
		free(prev_record);
   }
}


void
radius_search(record_t *current_record, double key[],
				list_t *list, int depth, int *count) {
	if (!current_record){
		return;
	}
	double point[DIMENSION];
	point[0] = key[0];
	point[1] = key[1];
	double targetFromKey = 0, targetFromRecord = 0;
	double distance = calculate_distance(point, current_record->data->point);
	*count += 1;
	if (distance < key[2]) {
		list = insert_at_foot(list, current_record);
		radius_search(current_record->left, key, list, 1+depth, count);
		radius_search(current_record->right, key, list, 1+depth, count);
	}
	else {
		if (depth %2 == 0) {
			targetFromKey = key[0];
			targetFromRecord = current_record->data->point[0];
		}
		else {
			targetFromKey = key[1];
			targetFromRecord = current_record->data->point[1];
		}
		if (targetFromKey < targetFromRecord) {
			radius_search(current_record->left, key, list, 1+depth, count);
			if (fabs(targetFromKey - targetFromRecord) < key[2]){
				radius_search(current_record->right, key, list, 1+depth, count);
			}

		}
		else {
			radius_search(current_record->right, key, list, 1+depth, count);
			if (fabs(targetFromKey - targetFromRecord) < key[2]){
				radius_search(current_record->left, key, list, 1+depth, count);
			}
		}
	}
}
//tree.h
#include "list.h"
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
double calculate_distance(double* p1, double* p2);
void free_tree(tree_t *tree);
void free_record(record_t *current_record);
void recursive_free_tree(record_t *current_record, int*free_tree);
void radius_search(record_t *current_record, double key[], list_t *list, int depth, int *count);
//
map1: map1.o tree.o
	gcc -g -o map1 map1.o -lm

tree.o: tree.c tree.h
	gcc -g -c -Wall tree.c

map1.o: map1.c
	gcc -g -c -Wall map1.c
