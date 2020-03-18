# russian-freedom.github.io

https://mrsmetamorfa.github.io/russian-freedom.github.io/

```images/content``` - иконки. По-хорошему нужно собрать в спрайт, но оставила на случай, если нужно будет заменить.

```images/general``` - картинки и логотипы. И флаг.

В будущем изменится структура стилей:
	```main.css``` - общие для всех сайтов.
	```children.css``` - для дочерних, на основном подключать не нужно.
	```arctic.css, baikal.css, moscow.css, petersburg.css``` - файлы тем, там будут только цвета.
	
Тема меняется изменением дополнительного класса для 'main.main':
	```.arctic, .baikal, .moscow, .petersburg``` - добавляют нужную тему, 
	отсутствие этих классов оставляет тему дефолтной.
	
```js/main.js``` тоже разделится на два, в ```children.js``` перемесятся скрипты дочерних сайтов.

На данный момент html-структура неизменна для всех страниц.
Все остальные изменения коснуться только стилей и скриптов.

**Удалить отовсюду onclick**
** Ссылки изменились на кнопки внутри .tours-carousel_slides**
```<a class="btn btn-arrow" href=# aria-label=""></a>``` 
=>
```<button class="btn btn-arrow btn-prev" type="button" aria-label="Prev"></button>```
и 
```<button class="btn btn-arrow btn-next" type="button" aria-label="Next"></button>```
