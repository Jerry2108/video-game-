#include <stdio.h>
#include<string.h>
#include<stdlib.h>
int main(){
    char* name = "Jerry\0";
    char* name1 = malloc(50);\
    strcpy(name1, "nam");
    *(name1+3) = 'e';
    name1[4] = '\0';
   printf("%s %d", name1, sizeof(name));
   return 0;
}