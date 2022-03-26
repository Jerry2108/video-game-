
/*This assignment is done by Ngoc Bao Luong(ngocbaol@student.unimelb.edu.au)*/

#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <string.h>
#include "tree.h"
#include "tree.c"
#define RECORD_LENGTH 512
#define FIELD_LENGTH 128
#define NUM_FIELDS 11

char** separate_fields(char *line);
data_t *fill_in_information(char** fields);
tree_t *create_a_tree(char* file_name1);


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
	char *c;
	(information->points)[0] = strtod(information->x, &c);
	(information->points)[1] = strtod(information->y, &c);
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


int main(int argc, char** argv){
    char *name1 = argv[1];

	/*size_t c = 0;*/
    /*stage1*/
	/*build a Kd tree*/
    tree_t *records =  create_a_tree(name1);
	print_a_tree(records->current_record);
    if (!records->current_record->right){
        printf("null\n");
    }

    /*printf("right %lf\n",(records->current_record->data->points)[0]);*/
    /*stage2*/
    double loc[2] = {144.959522 -37.800095};
	/*double loc[2] = {13,2};*/
    closest_t *closest = (closest_t*)malloc(sizeof(closest_t));
	closest->closest_record = NULL;
	find_the_closest_point(records->current_record, closest, loc, 0);
	printf("the closest x and y are %s, %s ", closest->closest_record->data->x,
           closest->closest_record->data->y);
    /*step 2: write records having keys provided by a key file to an output file*/
    /*while (getline(&key, &c, stdin) != -1){
		key[strlen(key)-1] = '\0';
        produce_outputFile(key, records, name2);
    }*/
    /*step 3: free memory after searching*/
	/*free(key);
    free_list(records); */
    return 0;
}

