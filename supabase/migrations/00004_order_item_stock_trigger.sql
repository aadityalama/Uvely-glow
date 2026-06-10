-- Decrement product stock when order line items are created (bypasses RLS safely via SECURITY DEFINER)

create or replace function public.decrement_stock_on_order_item()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.product_id is not null then
    update public.products
    set stock = greatest(0, stock - new.quantity)
    where id = new.product_id;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_order_item_decrement_stock on public.order_items;
create trigger trg_order_item_decrement_stock
  after insert on public.order_items
  for each row execute function public.decrement_stock_on_order_item();
