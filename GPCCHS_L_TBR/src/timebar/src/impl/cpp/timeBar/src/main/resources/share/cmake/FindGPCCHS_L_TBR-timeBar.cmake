
# - Try to find ConsumerParameter
# Once done this will define
#  GPCCHSLTBRTIMEBAR_FOUND - System has GPCC TIMEBAR
#  GPCCHSLTBRTIMEBAR_INCLUDE_DIRS - The GPCC TIMEBAR include directories
#  GPCCHSLTBRTIMEBAR_LIBRARIES - The libraries needed to use GPCC TIMEBAR

# Find the dependencies before checking for the component

find_package(Qt REQUIRED)
find_package(Qt5Widgets REQUIRED)
find_package(GPCCCM_L_CML-commonMMI REQUIRED)
find_package(GPCCCM_L_CML-commonMMIUtils REQUIRED)
find_package(GPCCHS_L_TBR-jsUtils REQUIRED)
find_package(Qt5Quick REQUIRED)			
find_package(GPCCCM_L_CML-timeBarsModel REQUIRED)
find_package(GPCCCM_L_CML-sessionLibraryWrapper REQUIRED)
find_package(GPIN-sessionLibrary REQUIRED)

find_path(GPCCHSLTBRTIMEBAR_INCLUDE_DIR timeBar/GPCCHS_L_TBR_TimeBar.h
           dependencies/include
           NO_DEFAULT_PATH
           NO_CMAKE_ENVIRONMENT_PATH
           NO_CMAKE_PATH
           NO_SYSTEM_ENVIRONMENT_PATH
           NO_CMAKE_SYSTEM_PATH
          )

find_library(GPCCHSLTBRTIMEBAR_LIBRARY ${CMAKE_SHARED_LIBRARY_PREFIX}gpcchs_l_tbr_timeBar${CMAKE_SHARED_LIBRARY_SUFFIX}.${GPCCHS_VERSION}
              dependencies/lib/so
              NO_DEFAULT_PATH
              NO_CMAKE_ENVIRONMENT_PATH
              NO_CMAKE_PATH
              NO_SYSTEM_ENVIRONMENT_PATH
              NO_CMAKE_SYSTEM_PATH
             )

set (GPCCHSLTBRTIMEBAR_INCLUDE_DIRS ${GPCCHSLTBRTIMEBAR_INCLUDE_DIR})
set (GPCCHSLTBRTIMEBAR_LIBRARIES ${GPCCHSLTBRTIMEBAR_LIBRARY})

set (ISIS_LIBRARIES ${GPCCHSLTBRTIMEBAR_LIBRARIES} ${ISIS_LIBRARIES})
set (ISIS_INCLUDES ${GPCCHSLTBRTIMEBAR_INCLUDE_DIRS} ${ISIS_INCLUDES})

include(FindPackageHandleStandardArgs)
# handle the QUIETLY and REQUIRED arguments and set GPCCHSLTBRTIMEBAR_FOUND to TRUE
# if all listed variables are TRUE
find_package_handle_standard_args(GPCCHSLTBRTIMEBAR DEFAULT_MSG GPCCHSLTBRTIMEBAR_INCLUDE_DIRS GPCCHSLTBRTIMEBAR_LIBRARIES)

if ( GPCCHSLTBRTIMEBAR_FOUND )
     MESSAGE (STATUS, "GPCC TIMEBAR Found")
endif ()

mark_as_advanced(GPCCHSLTBRTIMEBAR_INCLUDE_DIR GPCCHSLTBRTIMEBAR_LIBRARY )

