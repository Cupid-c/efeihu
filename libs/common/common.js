$.cloneDom = function(opts) {

	var _default = {
		baseDom: null,
		url: null,
		data: [],
		cloneSize: 0,
		page: false,
		pageContainer: null
	}
	var $this = this;

	$this.newObj = $.extend(_default, opts);

	var init = function(_callback) {

		if(!$this.newObj.data && !$this.newObj.url) {
			return false;
		}

		if(!$this.newObj.baseDom || $this.newObj.cloneSize < 1) {
			return false;
		}

		if($this.newObj.data[0]) {
			$this.newObj.data = !$this.newObj.data instanceof Array ? [$this.newObj.data] : $this.newObj.data;
		} else if($this.newObj.url) {
			$.get($this.newObj.url + '?_=' + Math.random(), function(_response) {
				$this.newObj.data = typeof _response == 'string' ? JSON.parse(_response) : _response;

				if(_callback && typeof _callback == 'function') {
					_callback();
				}
			})
		}
		return true;
	}

	var generateHtml = function(_page) {
		_page = _page || 1;

		var _pageSize = $this.newObj.cloneSize;

		var _min = (_page - 1) * _pageSize;
		//每页显示的数组最大下标
		var _max = _page * _pageSize - 1;

		if(!$this.newObj.data[0]) {
			return false;
		}
		$($this.newObj.baseDom).not(':first-child').remove();
		for(var i = _min; i <= _max; i++) {
			if($this.newObj.data[i]) {
				var _cloneDom = $($this.newObj.baseDom).eq(0).clone().appendTo($($this.newObj.baseDom).parent());
				$.each($('[dk-bind]', _cloneDom), function(_index, _element) {
					if($(_element).is('img')) {
						$(_element).attr('src', $this.newObj.data[i][$(_element).attr('dk-bind')]);
					} else {
						$(_element).text($this.newObj.data[i][$(_element).attr('dk-bind')]);
					}
				})
			}
		}
		$($this.newObj.baseDom).eq(0).remove();
	}

	var dkpage = function() {
		$($this.newObj.pageContainer).pagination({
			dataSource: $this.newObj.data,
			pageSize: $this.newObj.cloneSize,
			callback: function(response, pagination) {
				$this.refresh(pagination.pageNumber);

			}
		});

		$($this.newObj.pageContainer).addHook('beforePageOnClick', function(_event, _pagenumber) {

		})
		$($this.newObj.pageContainer).addHook('beforeInit', function(_event, _pagenumber) {

		})
	}

	this.refresh = function(_page) {

		if(!this.newObj.data[0] && this.newObj.url) {

			init(function() {
				generateHtml(_page);
				if($this.newObj.page) {
					dkpage();
				}
			});
		} else if(this.newObj.data && !this.newObj.data instanceof Array) {

			var _init = init();
			if(_init) {

				generateHtml(_page);
				if($this.newObj.page) {
					dkpage();
				}
			}
		} else if(this.newObj.data && this.newObj.data instanceof Array) {
			generateHtml(_page);
		}
	}

	this.refresh(1);
}




