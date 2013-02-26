SDK.UI
======

UI components [GitPage](http://switer.github.com/SDK.UI/)

## 组件使用

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

## 组件基础类

### 组件类
```css
.sui-btn /*普通按钮*/
.sui-btn-sel /*选择下拉按钮*/
.sui-btn-group /*按钮组*/
.sui-btn-nav /*导航栏按钮*/
```
### 主题类
**button主题**

```css
.sui-btn-primary 
```
![primary](https://raw.github.com/switer/resource/master/btn-orange.png)
```css
.sui-btn-pure
```
```css
.sui-btn-silver
```
```css
.sui-btn-inverse
```

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

## 组件DOM属性

### Button
```html
<button class="sui-btn" data-toggle="2000"></button>
```
<code>data-toggle="2000"</code> 属性指定该按钮有toggle效果，且toggle时间为2000ms

### Input

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


## 组件增强API
   

