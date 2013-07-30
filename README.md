SDK.UI
======

UI components For SDK H5 [SUI Demo Pages](http://switer.github.com/SDK.UI/)

## 组件DOM属性

### Button

<code>data-toggle="2000"</code> toggle属性，指定该按钮的toggle时间为2000ms
```html
<button class="sui-btn" data-toggle="2000"></button>
```
<code>data-feedback="sui-feedback"</code> 自定义反馈属性，指定该按钮反馈类为feedback来进行自定义反馈
```html
<button class="sui-btn" data-feedback="sui-feedback"></button>
```
### Input

暂无，持续更新中

### Popup Box
```html
<div class="sui-popbox" 
    data-position='fixed' data-transition=true data-cancel=true data-noscroll='true'></div>
```
`data-position='fixed'` 属性指定该弹出框位置JS控制fixed

`data-transition=true` 属性指定当弹框位置为fixed的时候，滚动页面，Fixed位置的过度动画为渐变的，
不设置则无过度动画

`data-cancel=true` 属性指定当点击非弹出框位置，隐藏弹出框

`data-noscroll=true` 属性指定当点击非弹出框位置，弹框页面不可滚动

`data-center=true` 属性指定弹出框位置居中，此属性建议不要与`data-position="fixed"`共用

## 组件增强API
命名尽量避免与JQ产生冲突  

### 基础API

```javascript
$('.sui-cpn').suiShow()  //显示UI组件
```
```javascript
$('.sui-cpn').suiHide()  //隐藏UI组件
```
```javascript
$('.sui-cpn').delayHide([time])  //time时间后隐藏UI组件，默认空参数认为time == 100
```
```javascript
$('.sui-cpn').isHide()  //UI组件是否已经隐藏，return bool
```
```javascript
$('.sui-cpn').suiToggle() //通用UI组建的toggle
```

### 按钮buttonAPI

`等同于<div class="sui-btn" data-toggle="200">的data-toggle属性`
```javascript
$('.btn').btnToggle(time, [callback])  //按钮toggle,time为toggle时间，callba为toggle完成的回调
```
```javascript
$('.btn').enabled() //取消按钮不可点击效果
```
```javascript
$('.btn').disabled() //按钮不可点击效果
```
```javascript
$('.btn').isdisabled() //按钮是否处于disable状态, return bool
```
```javascript
$('.btn').feed() //应用默认反馈效果
```
```javascript
$('.btn').unfeed() //取消按钮的默认反馈效果
```
```javascript
$('.btn').feeback([className]) //自定义反馈，@className：反馈样式class，空参数默认为：sui-feedback
```

### 弹出框 API
```javascript
$('.sui-popbox').checkPosition(); //定时检查该弹框的高度位置是否正确并更正
```
```javascript
$('.sui-popbox').tansition(); //设置改弹框的滚动的过渡动画
```
```javascript
$('.sui-popbox').showPopbox(); //显示一个隐藏的弹框
```
```javascript
$('.sui-popbox').fixed(); //设置弹框的高度固定
```
### 输入框 API

暂无，持续更新中...

## 组件基础类

### 组件类
```css
.sui-btn /*普通按钮*/
```
![orange](https://raw.github.com/switer/resource/master/btn-orange.png)
```css
.sui-btn-sel /*选择下拉按钮*/
.sui-btn-group /*按钮组*/
.sui-btn-nav /*导航栏按钮*/
```
```css
.sui-btn-check
```
![inverse](https://raw.github.com/switer/resource/master/images/cb1.png)  ![inverse](https://raw.github.com/switer/resource/master/images/cb2.png)
```css
.sui-btn-switch
```
![inverse](https://raw.github.com/switer/resource/master/images/on.png)   ![inverse](https://raw.github.com/switer/resource/master/images/off.png)


### 主题类
**button主题**

```css
.sui-btn-orange 
```
![orange](https://raw.github.com/switer/resource/master/btn-orange.png)
```css
.sui-btn-primary
```
![primary](https://raw.github.com/switer/resource/master/btn-pure.png)
```css
.sui-btn-silver
```
![silver](https://raw.github.com/switer/resource/master/btn-silver.png)
```css
.sui-btn-inverse
```
![inverse](https://raw.github.com/switer/resource/master/btn-inverse.png)
```css
.sui-btn-pure
```
这是按钮

**input主题**
```css
.sui-inp-shadow-top /*输入框内部阴影，偏上*/
.sui-inp-shadow-bottom /*输入框内部阴影，偏下*/
.sui-inp-shadow-none /*输入框无内部阴影*/
```

**popup box主题**
```css
.sui-popbox-black
```


## 组件应用示例

###Button
```html
<!--按钮默认样式为橙色-->
    <input class="sui-btn sui-w-full sui-mg-top" type="button" value="登录">
    
<!--可更换按钮样式：sui-btn-silver-->
    <input class="sui-btn sui-btn-silver sui-mg-top" type="button" value="修改密码">
    
<!--可设置toggle属性，指定toggle时间。对应的方法：$('btnSelctor').toggle(time, callback)-->
    <input class="sui-btn sui-btn-primary sui-mg-top" data-toggle="2000" type="button" value="toggle">
```
###input
```html
<!---->
<!--普通输入框-->
    <div class="sui-inp-cmp sui-mg-top">
		<div class="sui-inp-box">
			<input class="sui-inp" type="text"  placeholder="6-20位数字" />
		</div>
	</div>
    
<!--输入框带label-->
    <div class="sui-inp-cmp sui-mg-top">
        <div class="sui-inp-label">登录</div>
		<div class="sui-inp-box">
			<input class="sui-inp" type="text"  placeholder="6-20位数字" />
		</div>
	</div>
    
<!--输入框组-->
    <div class="sui-inp-group sui-mg-top">
    	<div class="sui-inp-box">
			<input class="sui-inp" type="text"  placeholder="6-20位数字" />
		</div>
		<div class="sui-inp-box">
			<input class="sui-inp" type="text"  placeholder="6-20位数字" />
		</div>
	</div>
```
        
###popup box
```html
<!--弹出框组件-->
<div class="sui-popbox sui-disp-none" data-position='fixed' data-transition=true data-cancel=true id="box1">
	<!--遮罩-->
	<div class="sui-popbox-mask"></div>
	<!--弹出框-->
	<div class="sui-popbox-box">
		<!--弹出框标题-->
		<div class="sui-popbox-title">title</div>
		<!--弹出框内容框-->
		<div class="sui-popbox-content">
			<div class="sui-mg-top">UC账号：123123123</div>
			<div class="sui-inp-box sui-mg-top sui-inp-shadow-top">
				<input class="sui-inp" type="text"  placeholder="6-20位数字" />
			</div>
			<input class="sui-btn sui-w-full sui-mg-top" type="button" value="注册">
		</div>
	</div>
</div>
```










