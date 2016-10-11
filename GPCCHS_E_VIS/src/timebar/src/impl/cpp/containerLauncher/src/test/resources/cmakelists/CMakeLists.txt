project(gpcchs_e_vis_containerLauncher)

cmake_minimum_required(VERSION 2.6)

if (CMAKE_INSTALL_PREFIX MATCHES "/usr/local")
    SET(CMAKE_INSTALL_PREFIX ${CMAKE_SOURCE_DIR}/../../../../target)
endif()

SET (CMAKE_MODULE_PATH "${CMAKE_ROOT}/Modules")
SET (CMAKE_MODULE_PATH "${find.dependencies.dir}/share/cmake" ${CMAKE_MODULE_PATH})
SET (CMAKE_PREFIX_PATH ${find.dependencies.dir} ${CMAKE_PREFIX_PATH})


message (STATUS, "MODULE_PATH = ${CMAKE_MODULE_PATH}")

message (STATUS, "construction du projet ${PROJECT_NAME} ${CMAKE_MODULE_PATH}")

include (ISIS REQUIRED)

message (STATUS "installation dir => ${CMAKE_INSTALL_PREFIX}")

set(PROJECT_SRC_DIR ../src/test/cpp)
set(PROJECT_INCLUDE_DIR ../src/test/inc)

include_directories(${PROJECT_INCLUDE_DIR} ${ISIS_INCLUDES})

file(GLOB_RECURSE files "${PROJECT_SRC_DIR}/*.cpp")

add_library(${PROJECT_NAME} SHARED ${files})
set_target_properties(${PROJECT_NAME} PROPERTIES SUFFIX ${CMAKE_SHARED_LIBRARY_SUFFIX}.${GPCC_VERSION})

target_link_libraries(${PROJECT_NAME} ${ISIS_LIBRARIES})

install(TARGETS ${PROJECT_NAME}
     RUNTIME DESTINATION bin
     LIBRARY DESTINATION lib)

install(DIRECTORY ${PROJECT_INCLUDE_DIR}/ DESTINATION include
     FILES_MATCHING PATTERN "*.h*" )
