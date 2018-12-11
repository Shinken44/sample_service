#include <string>
#include <iostream>
 
struct Perco {
  static void getStaffs (int division_id) {
    std::string response = "staffs fron C module";  //'{staffs:[{"name":"first","id":1,"tab_n":"333"},{"name":"second","id":2,"tab_n":"234"},{"name":"third","id":3,"tab_n":"4382"}]}'
    std::cout
      << "Hello, "
      << response << "!\n";
  };
};

#include "nbind/nbind.h"

NBIND_CLASS(Perco) {
    method(getStaffs);
};