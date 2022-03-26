/*
* BUI BINH AN PHAM 1087397
* Melbourne Census Dataset Information Retrieval using a Linked List
*/
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>
#include <ctype.h>
#include "llist.h"
#define numAttr 11
void stage_one(char *inputFile, list_t *businessDirectory);
list_t
*make_empty_list(void);
list_t
*make_empty_list(void) {
	list_t *list;
	list = (list_t*)malloc(sizeof(*list));
	assert(list!=NULL);
	list->head = list->foot = NULL;
	return list;
}
void stage_one(char *inputFile, list_t *businessDirectory);
int
main(int argc, char*argv[]) {
    list_t *businessDirectory = make_empty_list();


    /* stage 1: importing data from csv file */
    stage_one("andrewdata.txt", businessDirectory);
}
void
stage_one(char *inputFile, list_t *businessDirectory) {
    FILE *inputData;
    char *oneLine = NULL;
    size_t lineLength = 0;
    inputData = fopen(inputFile, "r");
    assert(inputData);
    /* get header */
    getline(&oneLine, &lineLength, inputData);
    char tmp[128];
    int tmpIndex = 0;
    int hasQuote = 0;
    char *tmpRow[numAttr];
    int tmpRowIndex;
    while (getline(&oneLine, &lineLength, inputData) != -1) {

        tmpRowIndex = 0;
        while (* oneLine) {
            if (*(oneLine) == '"') {
                if (*(oneLine+1) != '"' && !hasQuote) {
                    hasQuote = 1;
                }
                if ((*(oneLine+1) == ',' || *(oneLine+1) == '\n') && hasQuote) {
                    hasQuote = 0;
                }
                oneLine++;
            }
            if ((*(oneLine) == ',' || *(oneLine) == '\n') && !hasQuote) {
                tmp[tmpIndex] = '\0';
                tmpIndex = 0;
                tmpRow[tmpRowIndex] = malloc(strlen(tmp)*sizeof(char));
                strcpy(tmpRow[tmpRowIndex], tmp);
                tmpRowIndex++;

            } else {
                tmp[tmpIndex] = *oneLine;
                tmpIndex++;
            }
            oneLine++;
        }

        printf("%d\n", tmpRowIndex);
        for(int i=0;i<tmpRowIndex;i++) {
            printf("%s\n", tmpRow[i]);
        }
        break;
    }
    printf("has quote %d\n", hasQuote);
    free(oneLine);
    fclose(inputData);
}
