# Produced by Acceleo Cpp Generator 0.0.8-R6-20150703

project(gpcchs_l_tbr_jsUtils)

cmake_minimum_required(VERSION 2.8.10)

if (CMAKE_INSTALL_PREFIX MATCHES "/usr/local")
    SET(CMAKE_INSTALL_PREFIX ${CMAKE_SOURCE_DIR}/../../../../target)
endif()

SET (CMAKE_MODULE_PATH "${CMAKE_ROOT}/Modules")
SET (CMAKE_MODULE_PATH "${find.dependencies.dir}/share/cmake" ${CMAKE_MODULE_PATH})
SET (CMAKE_PREFIX_PATH ${find.dependencies.dir} ${CMAKE_PREFIX_PATH})

# Compilation flags
if (COVERAGE)
  SET (COV_OPT "-O0 --coverage")
else(COVERAGE)
  SET (COV_OPT "-O2")
endif (COVERAGE)
SET (CMAKE_CXX_FLAGS "-Wall -fPIC  ${COV_OPT} " )
SET (CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} ${COV_OPT}")

# Find includes in corresponding build directories
set(CMAKE_INCLUDE_CURRENT_DIR ON)

message (STATUS, "MODULE_PATH = ${CMAKE_MODULE_PATH}")
message (STATUS, "construction du projet ${PROJECT_NAME} ${CMAKE_MODULE_PATH}")

include (ISIS REQUIRED)

find_package(Qt REQUIRED)
find_package(Qt5Widgets REQUIRED)
find_package(Qt5WebKitWidgets REQUIRED)
find_package(Qt5WebSockets REQUIRED)
find_package(GPCCCM_L_CML-commonMMIUtils REQUIRED)
find_package(GPCCCM_L_CML-commonMMI REQUIRED)

message (STATUS "installation dir => ${CMAKE_INSTALL_PREFIX}")

set(PROJECT_SRC_DIR ../src/main/cpp)
set(PROJECT_INCLUDE_DIR ../src/main/inc)

include_directories(${PROJECT_INCLUDE_DIR} ${ISIS_INCLUDES})

if(Qt5_POSITION_INDEPENDENT_CODE)
  set(CMAKE_POSITION_INDEPENDENT_CODE ON)
endif()

# Search cpp, h, ui files
file(GLOB_RECURSE CPP_LIST "${PROJECT_SRC_DIR}/*.cpp")
file(GLOB_RECURSE UI_LIST "${PROJECT_SRC_DIR}/*.ui")
file(GLOB_RECURSE H_LIST "${PROJECT_INCLUDE_DIR}/*.h")

qt5_wrap_ui(UI_FILES ${UI_LIST})
qt5_wrap_cpp(MOC_FILES ${H_LIST})

#Use for windows compilation
add_definitions(-DPLOTLIBRARY)

add_library(${PROJECT_NAME} SHARED ${CPP_LIST} ${UI_FILES} ${MOC_FILES})


target_link_libraries(${PROJECT_NAME} ${ISIS_LIBRARIES} )

set_target_properties(${PROJECT_NAME} PROPERTIES SUFFIX ${CMAKE_SHARED_LIBRARY_SUFFIX}.${GPCC_VERSION})

# Use module from Qt 5.  
qt5_use_modules(${PROJECT_NAME} Widgets WebKitWidgets WebSockets)

install(TARGETS ${PROJECT_NAME}
     RUNTIME DESTINATION bin
     LIBRARY DESTINATION lib)

install(DIRECTORY ${PROJECT_INCLUDE_DIR}/ DESTINATION include
     FILES_MATCHING PATTERN "*.h*" )
