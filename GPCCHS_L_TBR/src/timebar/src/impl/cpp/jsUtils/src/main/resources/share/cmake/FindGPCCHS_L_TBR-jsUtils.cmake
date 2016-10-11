
# - Try to find ConsumerParameter
# Once done this will define
#  GPCCHSLTBRJSUTILS_FOUND - System has GPCCHS-L-TBR JSUTILS
#  GPCCHSLTBRJSUTILS_INCLUDE_DIRS - The GPCCHS-L-TBR JSUTILS include directories
#  GPCCHSLTBRJSUTILS_LIBRARIES - The libraries needed to use GPCCHS-L-TBR JSUTILS

# Find the dependencies before checking for the component

find_package(Qt REQUIRED)
find_package(Qt5Widgets REQUIRED)
find_package(Qt5WebKitWidgets REQUIRED)
find_package(Qt5WebSockets REQUIRED)
find_package(GPCCCM_L_CML-commonMMIUtils REQUIRED)
find_package(GPCCCM_L_CML-commonMMI REQUIRED)


find_path(GPCCHSLTBRJSUTILS_INCLUDE_DIR jsUtils/GPCCHS_L_TBR_JsUtils.h
           dependencies/include
           NO_DEFAULT_PATH
           NO_CMAKE_ENVIRONMENT_PATH
           NO_CMAKE_PATH
           NO_SYSTEM_ENVIRONMENT_PATH
           NO_CMAKE_SYSTEM_PATH
          )

find_library(GPCCHSLTBRJSUTILS_LIBRARY ${CMAKE_SHARED_LIBRARY_PREFIX}gpcchs_l_tbr_jsUtils${CMAKE_SHARED_LIBRARY_SUFFIX}.${GPCC_VERSION}
              dependencies/lib/so
              NO_DEFAULT_PATH
              NO_CMAKE_ENVIRONMENT_PATH
              NO_CMAKE_PATH
              NO_SYSTEM_ENVIRONMENT_PATH
              NO_CMAKE_SYSTEM_PATH
             )

set (GPCCHSLTBRJSUTILS_INCLUDE_DIRS ${GPCCHSLTBRJSUTILS_INCLUDE_DIR})
set (GPCCHSLTBRJSUTILS_LIBRARIES ${GPCCHSLTBRJSUTILS_LIBRARY})

set (ISIS_LIBRARIES ${GPCCHSLTBRJSUTILS_LIBRARIES} ${ISIS_LIBRARIES})
set (ISIS_INCLUDES ${GPCCHSLTBRJSUTILS_INCLUDE_DIRS} ${ISIS_INCLUDES})

include(FindPackageHandleStandardArgs)
# handle the QUIETLY and REQUIRED arguments and set GPCCHSLTBRJSUTILS_FOUND to TRUE
# if all listed variables are TRUE
find_package_handle_standard_args(GPCCHSLTBRJSUTILS DEFAULT_MSG GPCCHSLTBRJSUTILS_INCLUDE_DIRS GPCCHSLTBRJSUTILS_LIBRARIES)

if ( GPCCHSLTBRJSUTILS_FOUND )
     MESSAGE (STATUS, "GPCCHS-L-TBR JSUTILS Found")
endif ()

mark_as_advanced(GPCCHSLTBRJSUTILS_INCLUDE_DIR GPCCHSLTBRJSUTILS_LIBRARY )

