$(function(){
	$('.del').click(function(e){
		var target = $(e.target);
		var id = target.data('id');
		var tr = $('.item-id-'+id);
		
		$.ajax({
			type:"DELETE",
			url:"/admin/list/?id="+id
		}).done(function(results){
			console.log("ajax done");
			if(results.success === 1){
				if(tr.length > 0){
					console.log("To delete")
					tr.remove();
				}
			}
		});
	});
});
