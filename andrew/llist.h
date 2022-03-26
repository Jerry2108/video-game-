#ifndef LLIST_H_INCLUDED
#define LLIST_H_INCLUDED


#include <stdio.h>
typedef char str_t[128];
typedef struct {
	char* censusYear, blockID, propertyID, basePropertyID, CLUE, tradingName,
        industryCode, industryDescription, xCordinate, yCordinate, location;
} dict_t;
typedef struct node node_t;
struct node {
	dict_t *data;
	node_t *next;
};
typedef struct {
	node_t *head;
	node_t *foot;
} list_t;
list_t *make_empty_list(void);
int is_empty_list(list_t *list);
void free_list(list_t *list);
list_t *insert_at_foot(list_t *list, dict_t *value);
dict_t *get_head(list_t *list);
list_t *get_tail(list_t *list);
#endif
