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
	double points[DIMENSIONS];
}data_t;
struct record{
    data_t *data;
	record_t *left;
	record_t *right;
	record_t *next;
};
typedef struct{
	record_t *current_record;
}tree_t;
typedef struct{
	record_t *closest_record;
	double distance;
}closest_t;

tree_t *make_empty_tree();
record_t *recursive_insert(record_t *current_record, record_t *new_record,int depth);
tree_t *insert_in_order(tree_t *tree, data_t *information);
void print_a_tree(record_t* current_record);
void find_the_closest_point(record_t *current_record, closest_t* closet,double *loc, int depth);
double calculate_distance(double* p1, double* p2);
