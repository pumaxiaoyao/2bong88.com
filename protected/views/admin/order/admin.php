<?php
/* @var $this OrderController */
/* @var $model Order */

$this->breadcrumbs=array(
	'Orders'=>array('index'),
	'Manage',
);

$this->menu=array(
	array('label'=>'List Order', 'url'=>array('index')),
	array('label'=>'Create Order', 'url'=>array('create')),
);

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$('#order-grid').yiiGridView('update', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1>Manage Orders</h1>

<p>
You may optionally enter a comparison operator (<b>&lt;</b>, <b>&lt;=</b>, <b>&gt;</b>, <b>&gt;=</b>, <b>&lt;&gt;</b>
or <b>=</b>) at the beginning of each of your search values to specify how the comparison should be done.
</p>

<?php echo CHtml::link('Advanced Search','#',array('class'=>'search-button')); ?>
<div class="search-form" style="display:none">
<?php $this->renderPartial('_search',array(
	'model'=>$model,
)); ?>
</div><!-- search-form -->

<?php $this->widget('zii.widgets.grid.CGridView', array(
	'id'=>'order-grid',
	'dataProvider'=>$model->search(),
	'filter'=>$model,
	'columns'=>array(
		'Id',
		'type_order',
		array(
		
			'name'=>'IdUser',
			'value'=>'User::model()->findByPk($data->IdUser)->username',
		
		),
		'phone',
		array(
		
			'name'=>'time_create',
			'value'=>'date("d/m/Y H:i:s",$data->time_create)',
		
		),
		
		'status',
		'AmountVND',
		'AmountUSD',
		'ToBankName',
		'FromBankName',
		
		/*
		'Ip',
		'IdUser',
		'email',
		'code',
		'try',
		'viewed',
		'ToAccount',
		'AmountVND',
		'AmountUSD',
		'ToAccountName',
		'ToBankName',
		'Cookie',
		'phone',
		'name',
		'FromAccount',
		'FromAccountName',
		'FromBankName',
		*/
		array(
			'class'=>'CButtonColumn',
		),
	),
)); ?>
