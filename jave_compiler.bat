echo off
set "JAVA_HOME=C:\Program Files\Java\jdk-11.0.6\"
set java="%JAVA_HOME%bin\java.exe"
set javac="%JAVA_HOME%bin\javac.exe"
set "src=%cd%\src"
set "bin=%cd%\bin"
set "cp2=%cd%\lib\javafx-sdk-11.0.2\lib"
set "mainclass=%src%\App.java"
set "javafx=%cd%\lib\javafx-sdk-11.0.2\lib"
set "add-modules=javafx.controls,javafx.fxml,javafx.swing"
%javac% -d %bin% %mainclass% -cp "%bin%;%cp2%" --module-path "%javafx%" --add-modules %add-modules%
%java% -cp "%bin%;%cp2%" --module-path "%javafx%" --add-modules %add-modules% App