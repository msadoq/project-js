# Produced by Acceleo Cpp Generator 0.0.6-R4S1

project(gpcchs_e_vis_standaloneTimeBar)

cmake_minimum_required(VERSION 2.8.10)

if (CMAKE_INSTALL_PREFIX MATCHES "/usr/local")
    SET(CMAKE_INSTALL_PREFIX ${CMAKE_SOURCE_DIR}/../../../../target)
endif()

SET (CMAKE_MODULE_PATH "${CMAKE_ROOT}/Modules")
SET (CMAKE_MODULE_PATH "${find.dependencies.dir}/share/cmake" ${CMAKE_MODULE_PATH})
if (COVERAGE)
  SET (COV_OPT "-O0 --coverage")
else(COVERAGE)
  SET (COV_OPT "-O2")
endif (COVERAGE)
SET (CMAKE_CXX_FLAGS "-Wall -fPIC  ${COV_OPT} " )
SET (CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} ${COV_OPT}")

set(CMAKE_INCLUDE_CURRENT_DIR ON)

message (STATUS, "MODULE_PATH = ${CMAKE_MODULE_PATH}")

message (STATUS, "construction du projet ${PROJECT_NAME} ${CMAKE_MODULE_PATH}")

include (ISIS REQUIRED)
include (GPCCHS REQUIRED)

SET (CMAKE_PREFIX_PATH ${find.dependencies.dir} ${CMAKE_PREFIX_PATH})


find_package(GPCCHS_L_TBR-timeBar REQUIRED)

message (STATUS "installation dir => ${CMAKE_INSTALL_PREFIX}")

set(PROJECT_SRC_DIR ../src/main/cpp)
set(PROJECT_TEST_DIR ../src/test)
set(PROJECT_INCLUDE_DIR ../src/main/inc)

include_directories(${PROJECT_INCLUDE_DIR} ${ISIS_INCLUDES})

if(Qt5_POSITION_INDEPENDENT_CODE)
  set(CMAKE_POSITION_INDEPENDENT_CODE ON)
endif()


file(GLOB_RECURSE CPP_LIST "${PROJECT_SRC_DIR}/*.cpp")
file(GLOB_RECURSE UI_LIST "${PROJECT_SRC_DIR}/*.ui")
file(GLOB_RECURSE H_LIST "${PROJECT_INCLUDE_DIR}/*.h")

qt5_wrap_ui(UI_FILES ${UI_LIST})
qt5_wrap_cpp(MOC_FILES ${H_LIST})


add_library(${PROJECT_NAME} SHARED ${CPP_LIST} ${UI_FILES} ${MOC_FILES})


target_link_libraries(${PROJECT_NAME} ${ISIS_LIBRARIES})

set_target_properties(${PROJECT_NAME} PROPERTIES SUFFIX ${CMAKE_SHARED_LIBRARY_SUFFIX}.${GPCCHS_VERSION})

qt5_use_modules(${PROJECT_NAME} Widgets
)

install(TARGETS ${PROJECT_NAME}
     RUNTIME DESTINATION bin
     LIBRARY DESTINATION lib)

install(DIRECTORY ${PROJECT_INCLUDE_DIR}/ DESTINATION include
     FILES_MATCHING PATTERN "*.h*" )
