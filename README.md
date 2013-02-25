SDK.UI
======

UI components [GitPage](http://switer.github.com/SDK.UI/)

##Button
```html
<!--按钮默认样式为橙色-->
    <input class="sui-btn sui-w-full sui-mg-top" type="button" value="登录">
    
<!--可更换按钮样式：sui-btn-silver-->
    <input class="sui-btn sui-btn-silver sui-mg-top" type="button" value="修改密码">
    
<!--可设置toggle属性，指定toggle时间。对应的方法：$('btnSelctor').toggle(time, callback)-->
    <input class="sui-btn sui-btn-primary sui-mg-top" data-toggle="2000" type="button" value="toggle">
```

##input
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
        
##popup box

   

