<?php
/* @var $this OrderController */
/* @var $model Order */

$this->breadcrumbs=array(
	'Orders'=>array('index'),
	$model->name,
);

$this->menu=array(
	array('label'=>'List Order', 'url'=>array('index')),
	array('label'=>'Create Order', 'url'=>array('create')),
	array('label'=>'Update Order', 'url'=>array('update', 'id'=>$model->Id)),
	array('label'=>'Delete Order', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->Id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Order', 'url'=>array('admin')),
);
?>

<h1>View Order #<?php echo $model->Id; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'Id',
		'type_order',
		'sended',
		'time_create',
		'content',
		'status',
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
	),
)); ?>
