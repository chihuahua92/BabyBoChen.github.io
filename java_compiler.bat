set "JAVA_HOME=D:\Program Files\Java\jdk-15.0.2\"
set java="%JAVA_HOME%bin\java.exe"
set javac="%JAVA_HOME%bin\javac.exe"
set "src=%cd%\src"
set "bin=%cd%\bin"
set "cp2=C:\Users\User\Desktop\App\java_project\Debug_Java"
set "mainclass=%src%\app.java"
set "javafx=C:\Users\User\Desktop\App\java_project\Debug_Java\lib\javafx-sdk-11.0.2\lib"
set "add-modules=javafx.controls,javafx.fxml,javafx.swing"
%javac% -d %bin% %mainclass% -cp "%bin%;%cp2%" --module-path "%javafx%" --add-modules %add-modules%
%java% -cp "%bin%;%cp2%" --module-path "%javafx%" --add-modules %add-modules% App


